## Links
[[Basics]]
[[Java/Core/Core]]
[[Advanced]]
[[Java/Testing/Testing]]
[[Frameworks]]
[[Git]]
[[Databases]]
[[Build Tools]]
[[Logging & Tracing]] 

## Starting information:


- Copy Paste following code in the Execute Code Plugin - Global Injection:
---
import java.util.*;
import java.io.*;
import java.text.*;
import java.util.regex.*;

public class Launcher{
    public static void main(String[] args) {
        new StartPoint().run(args);
    }
}

  --- 
- this code snippit is executed before each java code block. The code is not compiled direclty, so the main method MUST be at the beginning of each block. 
- use ```java``` to add new code
- no public classes are allowed (single file)
- class StartPoint must be implemented in each java code (+ run method)
---

class StartPoint{
	public void run(String[] args){
	//enter code here
	}
}


---

- use ``` java {post} ``` to add java code at the end (for example configurations / models)
- use ```java {ignore= 'all' / ['pre' , 'post' , 'global']``` to ignore injected code


