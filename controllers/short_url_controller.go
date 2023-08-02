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
	"go.mongodb.org/mongo-driver/mongo"
)

var shortCollection *mongo.Collection = configs.GetCollection(configs.Mongo_DB, "shortened-urls")
var validate = validator.New()

func CreateShortUrl() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var newShortUrl models.ShortURL

		// Call BindJSON to bind received JSON to new shorturl
		if err := c.BindJSON(&newShortUrl); err != nil {
			c.JSON(http.StatusBadRequest, responses.ShortURLResponse{Status: http.StatusBadRequest, Message: "Could not create new shortened url.", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		if validationErr := validate.Struct(&newShortUrl); validationErr != nil {
			c.JSON(http.StatusBadRequest, responses.ShortURLResponse{Status: http.StatusBadRequest, Message: "Could not create new shortened url.", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		result, err := shortCollection.InsertOne(ctx, newShortUrl)
		if err != nil {
			return
		}

		c.IndentedJSON(http.StatusCreated, newShortUrl)
	}
}
