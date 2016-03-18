

(function (root) {
    var map = root.maze.MAZE_51;
    var path = root.maze.solution(map, 1, 0);
	var i = 1;
	
	var div = document.getElementById('field');
	
	div.appendChild(
        root.maze.render(map, path, i)
    );
	
	setInterval(func1, 1);
	
	function func1(){
		i++;
		div.removeChild(document.getElementsByClassName('maze')[0]);
		div.appendChild(
			root.maze.render(map, path, i)
		);
	};
	
	
    
})(this);
