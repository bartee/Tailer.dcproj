/**
 File System utility
 Uses command line access to find files, read dirs, and check for files
 
 @author Bart Stroeken
 @inspirauthor Klaas Speller
 **/
var FileSystem = Class.create({

    /** 
    Find the specific file 
    **/
    locate: function (filename) 
    {
        var result = widget.system("locate *"+filename, null).outputString;
        return result.split('\n');
    },
    
    /**
    File
    **/
    file : function (filename) 
    {
        var output = widget.system("/usr/bin/file " + filename, null).outputString;
        return output
    }
});
