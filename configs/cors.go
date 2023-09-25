package configs

import (
	"github.com/gin-contrib/cors"
)

func ConfigCors() cors.Config {
	config := cors.DefaultConfig()
	// config.AllowOrigins = []string{"http://127.0.0.1:5173"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Authorization", "Content-Type"}

	return config
}
