package configs

import (
	"os"
)

func EnvMongoURI() string {
	// err := godotenv.Load()
	// if err != nil {
	// 	log.Fatal("Error loading .env file")
	// }

	return os.Getenv("MONGO_DB_URI")
}
