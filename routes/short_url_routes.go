package routes

import (
	"api/url-shortener/controllers"

	"github.com/gin-gonic/gin"
)

func ShortURLRoute(router *gin.Engine) {
	router.POST("/short_urls/", controllers.CreateShortUrl())
	router.GET("/short_urls/:short", controllers.GetAShortUrl())
	router.GET("/short_urls/", controllers.GetAllShortUrls())

}
