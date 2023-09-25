package main

import (
	"api/url-shortener/configs"
	"api/url-shortener/routes"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	configs.ConnectToMongo()
	router.Use(cors.New(configs.ConfigCors()))
	routes.ShortURLRoute(router)
	router.Run("0.0.0.0:" + os.Getenv("PORT"))
}
