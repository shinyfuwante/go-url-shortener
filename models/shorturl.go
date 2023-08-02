package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type ShortURL struct {
	ID          primitive.ObjectID `json:"id"`
	Short       string             `json:"short"`
	FullURL     string             `json:"full_url"`
	NumClicked  int                `json:"num_clicked"`
	Description string             `json:"description"`
}
