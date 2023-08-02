package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type shorturl struct {
	ID          primitive.ObjectID `json:"id"`
	Short       string             `json:"short"`
	FullURL     string             `json:"full_url"`
	NumClicked  int                `json:"num_clicked"`
	Description string             `json:"description"`
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	mongo_uri := os.Getenv("MONGO_DB_URI")
	// Use the SetServerAPIOptions() method to set the Stable API version to 1
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(mongo_uri).SetServerAPIOptions(serverAPI)
	// Create a new client and connect to the server
	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()
	// Send a ping to confirm a successful connection
	if err := client.Database("admin").RunCommand(context.TODO(), bson.D{{"ping", 1}}).Err(); err != nil {
		panic(err)
	}
	fmt.Println("Pinged your deployment. You successfully connected to MongoDB!")

	collection := client.Database("go-url-shortener").Collection("shortened-urls")
	router := gin.Default()
	router.GET("/short_urls", getShortURLs)
	router.GET("/short_urls/:short", getLongUrl)
	router.POST("/short_urls", postShortUrl)

	router.Run("localhost:8080")
}

func getShortURLs(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, shorts)
}

func postShortUrl(c *gin.Context) {
	var newShortUrl shorturl

	// Call BindJSON to bind received JSON to new shorturl
	if err := c.BindJSON(&newShortUrl); err != nil {
		return
	}

	// Add to memory
	shorts = append(shorts, newShortUrl)
	c.IndentedJSON(http.StatusCreated, newShortUrl)
}

func getLongUrl(c *gin.Context) {
	short := c.Param("short")

	for _, a := range shorts {
		if a.Short == short {
			// c.IndentedJSON(http.StatusOK, a)
			c.Redirect(http.StatusFound, a.FullURL)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "shortened url not found"})
}

func connectToMongo() {
	mongo_uri := os.Getenv("MONGO_DB_URI")
	// Use the SetServerAPIOptions() method to set the Stable API version to 1
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(mongo_uri).SetServerAPIOptions(serverAPI)
	// Create a new client and connect to the server
	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()
	// Send a ping to confirm a successful connection
	if err := client.Database("admin").RunCommand(context.TODO(), bson.D{{"ping", 1}}).Err(); err != nil {
		panic(err)
	}
	fmt.Println("Pinged your deployment. You successfully connected to MongoDB!")
}
