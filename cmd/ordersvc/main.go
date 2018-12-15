//go:generate protoc -I ../../proto --go_out=plugins=grpc:../../proto ../../proto/todo.proto
//docker run -d -p 8080:8080 --network=host envoy/envoy
//CTRL + SHIFT + F10

package main

import (
	"fmt"
)

func main() {
	fmt.Println("Hello World!")
}
