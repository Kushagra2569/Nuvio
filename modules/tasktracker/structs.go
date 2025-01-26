package tracker

type Priority int

type Task struct {
	Id          int      `json:"Id"`
	Description string   `json:"Description"`
	Status      bool     `json:"Status"`
	Priority    Priority `json:"priorityValue"`
}

type Tasks struct {
	Tasks      []Task `json:"todos"`
	IdNum      int    `json:"idNum"`
	fileLoaded bool
}

const (
	High Priority = iota + 1
	Medium
	Low
)
