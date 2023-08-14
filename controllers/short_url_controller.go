package controllers

import (
	"api/url-shortener/configs"
	"api/url-shortener/models"
	"api/url-shortener/responses"
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var shortCollection *mongo.Collection = configs.GetCollection(configs.Mongo_DB, "shortened-urls")
var validate = validator.New()

func CreateShortUrl() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var newShortUrl models.ShortURL

		// Call BindJSON to bind received JSON to new shorturl
		if err := c.BindJSON(&newShortUrl); err != nil {
			c.JSON(http.StatusBadRequest, responses.ShortURLResponse{Status: http.StatusBadRequest, Message: "Could not create new shortened url.", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		if validationErr := validate.Struct(&newShortUrl); validationErr != nil {
			c.JSON(http.StatusBadRequest, responses.ShortURLResponse{Status: http.StatusBadRequest, Message: "Could not create new shortened url.", Data: map[string]interface{}{"data": validationErr.Error()}})
			return
		}
		opts := options.Update().SetUpsert(true)
		filter := bson.D{{Key: "short", Value: newShortUrl.ShortURL}}
		update := bson.D{{Key: "$set", Value: bson.D{
			{Key: "full_url", Value: newShortUrl.FullURL},
			{Key: "num_clicked", Value: newShortUrl.NumClicked},
			{Key: "description", Value: newShortUrl.Description},
		}}}
		d, err := shortCollection.Find(ctx, filter)
		if d != nil {
			c.JSON(http.StatusInternalServerError, responses.ShortURLResponse{Status: http.StatusInternalServerError, Message: "Shortened URL already exists!", Data: map[string]interface{}{"data": err.Error()}})
			return
		}
		result, err := shortCollection.UpdateOne(ctx, filter, update, opts)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.ShortURLResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		c.IndentedJSON(http.StatusCreated, responses.ShortURLResponse{Status: http.StatusCreated, Message: "success", Data: map[string]interface{}{"data": result}})
	}
}

func GetAShortUrl() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		short := c.Param("short")
		var shortUrl models.ShortURL

		defer cancel()

		filter := bson.M{"short": short}
		err := shortCollection.FindOne(ctx, filter).Decode(&shortUrl)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.ShortURLResponse{Status: http.StatusInternalServerError, Message: "Could not find desired short url", Data: map[string]interface{}{"data": err.Error()}})
			return
		}
		c.Redirect(http.StatusFound, shortUrl.FullURL)

		shortUrl.NumClicked++
		// update := bson.D{{Key: "$set", Value: bson.D{{Key: "num_clicked", Value: shortUrl.NumClicked}}}}
		update := bson.D{{"$set", bson.D{{"num_clicked", shortUrl.NumClicked}}}}

		result, err := shortCollection.UpdateOne(ctx, bson.M{"short": short}, update)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.ShortURLResponse{Status: http.StatusInternalServerError, Message: "Error when trying to update", Data: map[string]interface{}{"data": err.Error()}})
			return
		}
		c.JSON(http.StatusOK, responses.ShortURLResponse{Status: http.StatusOK, Message: "Success", Data: map[string]interface{}{"data": result}})
	}
}

func GetAllShortUrls() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var shorts []models.ShortURL
		defer cancel()

		options := options.Find()
		options.SetSort(bson.D{{Key: "num_clicked", Value: -1}})
		options.SetLimit(5)

		results, err := shortCollection.Find(ctx, bson.M{}, options)

		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.ShortURLResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		defer results.Close(ctx)
		for results.Next(ctx) {
			var singleShort models.ShortURL
			if err = results.Decode(&singleShort); err != nil {
				c.JSON(http.StatusInternalServerError, responses.ShortURLResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			}
			shorts = append(shorts, singleShort)
		}

		c.JSON(http.StatusOK, responses.ShortURLResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": shorts}})
	}
}
