package configs

import (
	"github.com/gin-contrib/cors"
)

func ConfigCors() cors.Config {
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowOrigins = []string{"https://metamon.dev/"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Authorization", "Content-Type"}

	return config
}
