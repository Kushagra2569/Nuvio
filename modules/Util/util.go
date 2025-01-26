package util

import (
	"os"
)

func LoadFile(path string) ([]byte, error) {
	file, err := os.ReadFile(path)
	return file, err
}

func WriteFile(path string, data []byte) error {
	err := os.WriteFile(path, data, 0666)
	return err
}
