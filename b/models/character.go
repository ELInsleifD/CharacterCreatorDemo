package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Character struct {
	ID       primitive.ObjectID `bson:"_id"`
	CharName *string            `json:"charname"`
	ImgUrl   *string            `json:"imgurl"`
	Bio      *string            `json:"bio"`
	Age      *string            `json:"age"`
}
