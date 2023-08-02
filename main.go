package main

import (
	"api/url-shortener/configs"
	"api/url-shortener/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	configs.ConnectToMongo()

	routes.ShortURLRoute(router)
	router.Run("localhost:8080")
}
