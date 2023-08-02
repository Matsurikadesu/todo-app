export const handleGrab = (e) => {
        const board = document.querySelector('.board');
        const isColumn = e.target.classList.contains('board__column');
        const isTasksContainer = e.target.classList.contains('column__tasks');
        if(!(e.target === board || isColumn || isTasksContainer)) return;
        board.setAttribute('style', 'cursor: grab;');

        let currentX = e.clientX;
        let currentY = e.clientY;

        const onMouseMove = (e) => {
            const moveX = currentX - e.clientX;
            const moveY = currentY - e.clientY;
            currentX = e.clientX;
            currentY = e.clientY;
            board.scrollLeft += moveX;
            board.scrollTop += moveY;
        };

        const onMouseUp = function(){
            this.removeEventListener('mousemove', onMouseMove);
            this.removeEventListener('mouseup', onMouseUp);
            board.setAttribute('style', '');
        }

        board.addEventListener('mousemove', onMouseMove);
        board.addEventListener('mouseup', onMouseUp);
    }