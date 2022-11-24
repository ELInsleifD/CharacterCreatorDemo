package main

import (
	"os"
	"server/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	port := os.Getenv("PORT")

	if port == "" {
		port = "8000"
	}

	router := gin.New()
	router.Use(gin.Logger())

	router.Use(cors.Default())

	router.POST("/char/create", routes.AddChar)

	router.GET("/characters", routes.GetChars)
	router.GET("/character/:id", routes.GetCharById)

	router.PUT("/character/update/hide/:id", routes.UpdateCharacter)

	router.DELETE("/character/delete/:id", routes.DeleteChar)

	router.Run(":" + port)

}
