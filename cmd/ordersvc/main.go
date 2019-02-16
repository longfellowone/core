//go:generate protoc -I ../../proto --go_out=plugins=grpc:../../proto ../../proto/todo.proto
//docker run -d -p 8080:8080 --network=host envoy/envoy
//CTRL + SHIFT + F10
//ALT + ENTER -> Fill struct

package main

import (
	"core/pkg"
	"core/pkg/field"

	"core/pkg/postgres"
	//"core/pkg/search"
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"log"
	// "time"
)

const (
	defaultGRPCPort = 9090
	defaultDBHost   = "localhost"
	defaultDBPort   = 5432
	defaultDBName   = "default"
	defaultDBUser   = "default"
	defaultDBPasswd = "password"
	sslMode         = "disable"
)

func main() {

	var (
		dbHost                   = defaultDBHost
		dbPort                   = defaultDBPort
		dbUser                   = defaultDBUser
		dbPasswd                 = defaultDBPasswd
		dbName                   = defaultDBName
		postgresConnectionString = fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=%s", dbHost, dbPort, dbUser, dbPasswd, dbName, sslMode)
	)

	//ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	//defer cancel()

	db, err := sql.Open("postgres", postgresConnectionString)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	if err = db.Ping(); err != nil {
		log.Fatal(err)
	}

	//var (
	//	orders procurement.OrderRepository
	//	//products procurement.ProductRepository
	//)

	orders := postgres.NewOrderRepository(db)
	//products = postgres.NewProductRepository(db)

	os := field.NewService(orders)
	//ss := search.NewService(products)

	//ss.Test()

	OrderID := procurement.OrderID(1)
	fmt.Println(os.FindOrderByID(OrderID))

	//grpc.New(os)

	//fmt.Println(server)

}

//fmt.Printf("text%vtext", (*v)[0])
