package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type ShortURL struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	ShortURL    string             `bson:"short" json:"short"`
	FullURL     string             `bson:"full_url" json:"full_url"`
	NumClicked  int                `bson:"num_clicked" json:"num_clicked"`
	Description string             `bson:"description" json:"description"`
}
