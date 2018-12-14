//go:generate protoc -I ../../proto --go_out=plugins=grpc:../../proto ../../proto/todo.proto

package main

import (
	"context"
	"fmt"
	"github.com/sahilm/fuzzy"
	"log"
	"net"
	"strconv"
	"time"
	pb "todo/proto"

	"github.com/satori/go.uuid"
	"google.golang.org/grpc"
)

const (
	port = ":9090"
)

type server struct {
	data     []*pb.Task
	results  []*pb.Product
	products products
}

type products []product

type product struct {
	Name string
	Uuid string
}

func (s products) Len() int {
	return len(s)
}

func (s products) String(i int) string {
	return s[i].Name
}

func main() {

	data := []*pb.Task{
		{Message: "Default item 1", Uuid: "5355507d-84e1-49dd-8200-7f64d8744698"},
		{Message: "Default item 2", Uuid: "9c8b613d-f2ff-453c-a522-217de81ccdf9"},
		{Message: "Default item 3", Uuid: "e4cda2ea-5c95-4dde-b3b7-706f746f598e"},
	}

	//results := []*pb.Product{
	// {Name: "Product 1", Uuid: "5355507d-84e1-49dd-8200-7f64d8744698"},
	// {Name: "Product 2", Uuid: "9c8b613d-f2ff-453c-a522-217de81ccdf9"},
	// {Name: "Product 3", Uuid: "e4cda2ea-5c95-4dde-b3b7-706f746f598e"},
	//}

	products := []product{
		{Name: "1/2\" EMT", Uuid: "5355507d-84e1-49dd-820345340-7f64d8744698"},
		{Name: "3/4\" EMT", Uuid: "9c8b613d-f2ff-43453453c-a522-217de81ccdf9"},
		{Name: "1\" EMT", Uuid: "e4cda2ea-5c95-4dde-3453b3b7-706f746f598e"},
		{Name: "1-1/4\" EMT", Uuid: "9c8b613d-f2ff-453c-a522-23453417de81ccdf9"},
		{Name: "2\" EMT", Uuid: "e4cda2ea-5c95-4dde-b3b7-4534"},
		{Name: "1/2\" PVC", Uuid: "9c8b613d-f2ff-453c-a53453422-217de81ccdf9"},
		{Name: "3/4\" PVC", Uuid: "e4cda2ea-5c95-4dde-453-706f746f598e"},
		{Name: "1\" PVC", Uuid: "9c8b613d-f2ff-453c-a522345345-217de81ccdf9"},
		{Name: "1-1/4\" PVC", Uuid: "e4cda2ea-5c95-4d3453de-b3b7-706f746f598e"},
		{Name: "2\" PVC", Uuid: "e4cda2ea-5c95-4dde-b3453453b7-706f746f598e"},
		{Name: "1/2\" Flex Connector", Uuid: "e4cda2ea-5c3453495-4dde-b3b7-706f746f598e"},
		{Name: "1/2\" Rigid Connector", Uuid: "e4c34534da2ea-5c95-4dde-b3b7-706f746f598e"},
		{Name: "1/2\" PVC Connector TA", Uuid: "34534-5c95-4dde-b3b7-706f746f598e"},
	}

	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterTodoServer(s, &server{data: data, products: products})

	fmt.Println("Listening...")

	// Register reflection service on gRPC server.
	// reflection.Register(s)

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

func (s *server) ListTasks(ctx context.Context, in *pb.Empty) (*pb.TaskResponse, error) {

	fmt.Println("New Request: ListTasks")
	fmt.Println("ListTasks: Complete!")

	return &pb.TaskResponse{Tasks: s.data}, nil
}

func (s *server) NewTask(ctx context.Context, in *pb.Task) (*pb.Empty, error) {

	fmt.Println("NewTask Request:", in)

	time.Sleep(500 * time.Millisecond) // To simulate a delayed response

	data := []*pb.Task{
		{Message: in.Message, Uuid: in.Uuid},
	}

	s.data = append(s.data, data...)

	fmt.Println("NewTask Response:", data)

	return &pb.Empty{}, nil
}

func (s *server) RemoveTask(ctx context.Context, in *pb.RemoveTaskRequest) (*pb.Empty, error) {

	for i := range s.data {
		if s.data[i].Uuid == in.Uuid {
			copy(s.data[i:], s.data[i+1:])
			s.data[len(s.data)-1] = nil
			s.data = s.data[:len(s.data)-1]
			break
		}
	}

	fmt.Printf("Deleted task: uuid:\"%v\"\n", in.Uuid)

	return &pb.Empty{}, nil
}

func (s *server) FindProduct(ctx context.Context, in *pb.FindProductRequest) (*pb.FindProductResponse, error) {

	s.results = nil

	if len(in.Name) < 1 {
		return &pb.FindProductResponse{}, nil
	}

	fmt.Println("FindProduct Request:", in.Name)

	results := fuzzy.FindFrom(in.Name, s.products)

	r := results.Len()
	if r > 10 {
		r = 10
	}
	results = results[:r]

	for i, r := range results {

		var indexes []*pb.Index

		for _, v := range results[i].MatchedIndexes {
			indexes = append(indexes, &pb.Index{Index: strconv.Itoa(v)})
		}

		id := uuid.NewV4().String()
		s.results = append(s.results, &pb.Product{Name: r.Str, Uuid: id, Indexes: indexes})

	}

	return &pb.FindProductResponse{Products: s.results}, nil
}
