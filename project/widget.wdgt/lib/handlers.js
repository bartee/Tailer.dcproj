/** Within this file, the custom handlers are defined for the buttons and all...**/

var log_text = "";
function logIt(msg) {
    log_text += msg + "\n";
    
    elements.log_window.innerText = log_text;
} 

function tailIt(event)
{
    validateFilePath();
    var file_to_tail = elements.filename.value;    
    logIt("Starting tail for: " + file_to_tail);
    widget.system("tail -f "+file_to_tail, function() { logIt("Done!") }).onreadoutput = function(stdout) {
        logIt(stdout);
    }
    showFront(event);
}

function validateFilePath()
{
    var file_to_tail = elements.filename.value;
    if (file_to_tail == ''){
        provide_input_feedback('No file input given!', false);
        return false;
    }
    
    var output = window.filesystem.file(file_to_tail);
    
    if(output.match(/cannot\ open/)){
        provide_input_feedback('File not found!', false);
        return false;
    }
    return false;
}

function locateFiles(event)
{
    var filename = elements.filename.value;
    if (filename =='' ){
        provide_input_feedback('No filename given!', false);
        return false;
    }
    files = window.filesystem.locate(filename);

    var rest = files.pop();
    FilelistDataSource._rowData = files;
    elements.selectedfile.object.reloadData();
    elements.selectedfile.style.display = 'block';
}

/**
 * Return the feedback
 * The valid-switch makes the feedback either red or green
 *
 * @param string string
 * @param boolean valid
 **/
function provide_input_feedback(string, valid){
    var color = 'green';
    if (!valid){
        color = 'red';
    }
    elements.input_feedback.style.fontColor = color;
    elements.input_feedback.innerHTML = string;
}

// This object implements the dataSource methods for the list.
var FilelistDataSource = {
	
	// Sample data for the content of the list. 
	// Your application may also fetch this data remotely via XMLHttpRequest.
	_rowData: ["Item 1", "Item 2", "Item 3"],
	
	// The List calls this method to find out how many rows should be in the list.
	numberOfRows: function() {
		return this._rowData.length;
	},
	
	// The List calls this method once for every row.
	prepareRow: function(rowElement, rowIndex, templateElements) {
		if (templateElements.rowLabel) {
			templateElements.rowLabel.innerText = this._rowData[rowIndex];
		}

		// Assign a click event handler for the row.
		rowElement.onclick = function(event) {
			// Do something interesting
			file_to_tail = event.target;
            alert(file_to_tail);
		};
	}
};
var file_to_tail = null;