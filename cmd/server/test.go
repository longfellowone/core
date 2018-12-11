package main

import (
	"fmt"
	"github.com/sahilm/fuzzy"
)

type employee struct {
	name string
	age  int
}

type employees []employee

func (e employees) String(i int) string {
	return e[i].name
}

func (e employees) Len() int {
	return len(e)
}

func main() {
	emps := employees{
		{
			name: "Alice",
			age:  45,
		},
		{
			name: "Bob",
			age:  35,
		},
		{
			name: "Allie",
			age:  35,
		},
	}
	results := fuzzy.FindFrom("al", emps)

	fmt.Println(

	fmt.Println(results)
}
