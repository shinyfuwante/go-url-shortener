package main

import (
	"api/url-shortener/configs"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	configs.ConnectToMongo()
	router.GET("/short_urls", getShortURLs)
	router.GET("/short_urls/:short", getLongUrl)
	router.POST("/short_urls", postShortUrl)

	router.Run("localhost:8080")
}

func getShortURLs(c *gin.Context) {
	// c.IndentedJSON(http.StatusOK, shorts)
}

func postShortUrl(c *gin.Context) {
	var newShortUrl shorturl

	// Call BindJSON to bind received JSON to new shorturl
	if err := c.BindJSON(&newShortUrl); err != nil {
		return
	}

	// Add to memory
	// shorts = append(shorts, newShortUrl)
	c.IndentedJSON(http.StatusCreated, newShortUrl)
}

func getLongUrl(c *gin.Context) {
	// short := c.Param("short")

	// for _, a := range shorts {
	// 	if a.Short == short {
	// 		// c.IndentedJSON(http.StatusOK, a)
	// 		c.Redirect(http.StatusFound, a.FullURL)
	// 		return
	// 	}
	// }
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "shortened url not found"})
}
