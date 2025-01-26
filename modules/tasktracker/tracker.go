package tracker

import (
	"encoding/json"
	"fmt"
	"nuvio/modules/util"
	"os"
)

func TasktoJson(todos Tasks) []byte {
	json, err := json.Marshal(todos)
	if err != nil {
		fmt.Println(err)
	}
	return json
}

func JsontoTasks(todoStr []byte) Tasks {
	var todos Tasks
	err := json.Unmarshal(todoStr, &todos)
	if err != nil {
		fmt.Println(err)
	}
	return todos
}

func getTodosFromFile() Tasks {
	todoStr, err := util.LoadFile(util.TodoFile)
	if err != nil {
		fmt.Println(err)
		if os.IsNotExist(err) {
			fmt.Println("File does not exist")
		}
	}
	todos := JsontoTasks(todoStr)
	return todos
}

func saveTodosToFile(todos Tasks) {
	json := TasktoJson(todos)
	err := util.WriteFile(util.TodoFile, json)
	if err != nil {
		fmt.Println(err)
	}
}

func (t *Tasks) NewTask(desc string, priorityJS int) string {
	var Pr Priority

	if priorityJS == 0 {
		Pr = High
	} else if priorityJS == 1 {
		Pr = Medium
	} else {
		Pr = Low
	}

	todo := Task{
		Id:          t.IdNum + 1,
		Description: desc,
		Status:      false,
		Priority:    Pr,
	}
	t.Tasks = append(t.Tasks, todo)
	t.IdNum = t.IdNum + 1
	return string(TasktoJson(*t))
}

func (t *Tasks) GetTasks() string {
	if !t.fileLoaded {
		*t = getTodosFromFile()
		t.fileLoaded = true
	}
	todoStr := TasktoJson(*t) //Kush:TODO: fix unnecessary conversion from json to struct and back to json
	return string(todoStr)
}

func (t *Tasks) UpdateTasks(TodoId int, status bool, priorityJS int) string {
	var Pr Priority

	if priorityJS == 1 {
		Pr = High
	} else if priorityJS == 2 {
		Pr = Medium
	} else {
		Pr = Low
	}

	for i := 0; i < len(t.Tasks); i++ {
		if t.Tasks[i].Id == TodoId {
			t.Tasks[i].Status = status
			t.Tasks[i].Priority = Pr
			break
		}
	}
	fmt.Println(string(TasktoJson(*t)))
	return string(TasktoJson(*t))
}

func (t *Tasks) SaveTasks() {
	saveTodosToFile(*t)
}

func (t *Tasks) DeleteTasks(TodoId int) string {

	for i := 0; i < len(t.Tasks); i++ {
		if t.Tasks[i].Id == TodoId {
			t.Tasks = append(t.Tasks[:i], t.Tasks[i+1:]...)
			break
		}
	}
	return string(TasktoJson(*t))
}
