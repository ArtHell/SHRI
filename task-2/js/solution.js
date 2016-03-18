(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

    /**
     * Функция находит путь к выходу и возвращает найденный маршрут
     *
     * @param {number[][]} maze карта лабиринта представленная двумерной матрицей чисел
     * @param {number} x координата точки старта по оси X
     * @param {number} y координата точки старта по оси Y
     * @returns {[number, number][]} маршрут к выходу представленный списоком пар координат
     */
    function solution(maze, x, y) {
        // 0 - down; 1 - up; 2 - left; 3 - right; dir хранит направление предыдущего шага по карте
		var dir = 0,
		    fl,
		    pathArray = [[x,y]];
		while(y < maze.length-1) {
			fl = true;
			while(fl) {
				switch(dir) {
				case 0: {
					if(maze[y][x - 1] === 0) {
						x--;
						fl = false;
						dir = 2;
					}
					else {
						dir = 3;
					}
					break;
				}
				case 1:{
					if(maze[y][x + 1] === 0) {
						x++;
						fl = false;
						dir = 3;
					}
					else {
						dir = 2;
					}
					break;
				}
				case 2:{
					if(maze[y - 1][x] === 0) {
						y--;
						fl = false;
						dir = 1;
					}
					else {
						dir = 0;
					}
					break;
				}
				case 3:{
					if(maze[y + 1][x] === 0) {
						y++;
						fl = false;
						dir = 0;
					}
					else {
						dir = 1;
					}
					break;
				}
				}
			}
			pathArray.push([x,y]);
		}
		console.log(pathArray.length); // вывод количества шагов в консоль
        return pathArray;
		
    }

    root.maze.solution = solution;
})(this);
