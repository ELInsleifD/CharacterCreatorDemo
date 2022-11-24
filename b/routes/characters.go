package routes

import (
	"context"
	"fmt"
	"net/http"
	"server/models"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var validate = validator.New()
var dbCollection *mongo.Collection = OpenCollection(Client, "Chars")

func AddChar(c *gin.Context) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var char models.Character

	if err := c.BindJSON(&char); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	validationErr := validate.Struct(char)
	if validationErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": validationErr.Error()})
		return
	}

	char.ID = primitive.NewObjectID()

	result, insertErr := dbCollection.InsertOne(ctx, char)
	if insertErr != nil {
		msg := fmt.Sprintf("character was not created")
		c.JSON(http.StatusInternalServerError, gin.H{"error": msg})
		return
	}

	defer cancel()
	c.JSON(http.StatusOK, result)
}

func GetChars(c *gin.Context) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var characters []bson.M

	cursor, err := dbCollection.Find(ctx, bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err = cursor.All(ctx, &characters); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	defer cancel()

	fmt.Println(characters)

	c.JSON(http.StatusOK, characters)
}

func GetCharById(c *gin.Context) {
	charId := c.Params.ByName("id")
	docId, _ := primitive.ObjectIDFromHex(charId)

	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

	var char bson.M

	if err := dbCollection.FindOne(ctx, bson.M{"_id": docId}).Decode(&char); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	defer cancel()
	fmt.Println(char)
	c.JSON(http.StatusOK, char)
}

func UpdateCharacter(c *gin.Context) {
	charId := c.Params.ByName("id")
	docId, _ := primitive.ObjectIDFromHex(charId)

	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

	var updChar models.Character
	if err := c.BindJSON(&updChar); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	validationErr := validate.Struct(updChar)
	if validationErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": validationErr.Error()})
		return
	}

	result, err := dbCollection.ReplaceOne(
		ctx,
		bson.M{"_id": docId},
		bson.M{
			"charname": updChar.CharName,
			"imgurl":   updChar.ImgUrl,
			"bio":      updChar.Bio,
			"age":      updChar.Age,
		},
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	defer cancel()
	c.JSON(http.StatusOK, result.ModifiedCount)
}

func DeleteChar(c *gin.Context) {
	charId := c.Params.ByName("id")
	docId, _ := primitive.ObjectIDFromHex(charId)

	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

	result, err := dbCollection.DeleteOne(ctx, bson.M{"_id": docId})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	defer cancel()

	c.JSON(http.StatusOK, result.DeletedCount)
}
