const includeHTML = (path, targetElementId) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                document.getElementById(targetElementId).innerHTML = xhr.responseText;
            } else {
                console.error(`Failed to include ${path}. Status: ${xhr.status}`);
            }
        }
    };

    xhr.open('GET', path, true);
    xhr.send();
};

// Exemplo de uso:
includeHTML('menu.html', 'menu');