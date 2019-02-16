//go:generate protoc -I ../../proto --go_out=plugins=grpc:../../proto ../../proto/todo.proto
//docker run -d -p 8080:8080 --network=host envoy/envoy
//CTRL + SHIFT + F10
//ALT + ENTER -> Fill struct

// package main

import (
	"context"
	"fmt"
	"github.com/mongodb/mongo-go-driver/mongo"
	"log"
	"time"
)

// https://groups.google.com/forum/#!topic/mongodb-go-driver/HAvYf0x3r1U

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, "mongodb://default:password@localhost:27017")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(client.ListDatabaseNames(ctx, nil))
	//collection := client.Database("test").Collection("test2")

	//ctx, _ = context.WithTimeout(context.Background(), 5*time.Second)
	//res, err := collection.InsertOne(ctx, bson.M{"name": "pii", "value": 3.14159, "test": "my string"})
	//if err != nil {
	//	log.Fatal(err)
	//}
	//fmt.Println(res)

	//var result struct {
	//	Value float64
	//	Test  string
	//}
	//filter := bson.M{"name": "pii"}
	//ctx, _ = context.WithTimeout(context.Background(), 30*time.Second)
	//err = collection.FindOne(ctx, filter).Decode(&result)
	//if err != nil {
	//	log.Fatal(err)
	//}
	//fmt.Println(result.Test)

	//ctx, _ = context.WithTimeout(context.Background(), 30*time.Second)
	//cur, err := collection.Find(ctx, nil)
	//if err != nil {
	//	log.Fatal(err)
	//}
	//defer cur.Close(ctx)
	//for cur.Next(ctx) {
	//	var result bson.M
	//	err := cur.Decode(&result)
	//	if err != nil {
	//		log.Fatal(err)
	//	}
	//	fmt.Println(result["name"])
	//	//bson.M -> Map
	//	//bson.D -> Slice
	//}
	//if err := cur.Err(); err != nil {
	//	log.Fatal(err)
	//}

}
