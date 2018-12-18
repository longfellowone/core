//go:generate protoc -I ../../proto --go_out=plugins=grpc:../../proto ../../proto/todo.proto
//docker run -d -p 8080:8080 --network=host envoy/envoy
//CTRL + SHIFT + F10
//ALT + ENTER -> Fill struct

package main

import (
	"context"
	"core/pkg/mongo"
	"core/pkg/order"
	"fmt"
	db "github.com/mongodb/mongo-go-driver/mongo"
	"log"
	"time"
)

const (
	defaultGRPCPort   = 9090
	defaultDBURL      = "localhost"
	defaultDBPort     = 27017
	defaultDBName     = "core"
	defaultDBUsername = "default"
	defaultDBPassword = "password"
)

func main() {
	//ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	//defer cancel()

	var (
		//dburl      = defaultDBURL
		//dbusername = defaultDBUsername
		//dbpassword = defaultDBPassword
		databaseName          = defaultDBName
		mongoConnectionString = fmt.Sprintf("mongodb://%s:%s@%s:%d", defaultDBUsername, defaultDBPassword, defaultDBURL, defaultDBPort)
	)

	//var (
	//	orders procurement.OrderRepository
	//)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := db.Connect(ctx, mongoConnectionString)
	if err != nil {
		log.Fatal(err)
	}

	orders, _ := mongo.NewOrderRepository(databaseName, client)

	var os ordering.Service
	os = ordering.NewService(orders) // Inject into gRPC service

	fmt.Println(os)
	fmt.Println("Hello World!")

}
