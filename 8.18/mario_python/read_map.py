import json


def read_map():
    with open('mario_map.txt', 'r', encoding='utf-8') as f:
        s = f.read()
        return json.loads(s)


if __name__ == '__main__':
    mario_map = read_map()
    print(len(mario_map))
