
---
title: Threads
tag: Advanced
publish: false
creation date: 2023-03-09 09:46
modification date: Thursday 9th March 2023 14:47:29
---

## Definition:
## Example:


```java 
public class Launcher {  
        public static void main(String[] args){  
            Thread t1 = new Thread(new HeavyWorkRunnable(), "t1");  
            Thread t2 = new Thread(new HeavyWorkRunnable(), "t2");  
            System.out.println("Starting Runnable threads");  
            t1.start();  
            t2.start();  
            System.out.println("Runnable Threads has been started");  
            Thread t3 = new MyThread("t3");  
            Thread t4 = new MyThread("t4");  
            System.out.println("Starting MyThreads");  
            t3.start();  
            t4.start();  
            System.out.println("MyThreads has been started");  
        }  
}  
  
 class HeavyWorkRunnable implements Runnable {  
  
    @Override  
    public void run() {  
        System.out.println("Doing heavy processing - START " + Thread.currentThread().getName());  
        try {  
            Thread.sleep(1000);  
            //Get database connection, delete unused data from DB  
            doDBProcessing();  
        } catch (InterruptedException e) {  
            e.printStackTrace();  
        }  
        System.out.println("Doing heavy processing - END " + Thread.currentThread().getName());  
    }  
  
    private void doDBProcessing() throws InterruptedException {  
        Thread.sleep(5000);  
    }  
}  
  
 class MyThread extends Thread {  
  
    public MyThread(String name) {  
        super(name);  
    }  
  
    @Override  
    public void run() {  
        System.out.println("MyThread - START "+Thread.currentThread().getName());  
        try {  
            Thread.sleep(1000);  
            //Get database connection, delete unused data from DB  
            doDBProcessing();  
        } catch (InterruptedException e) {  
            e.printStackTrace();  
        }  
        System.out.println("MyThread - END "+Thread.currentThread().getName());  
    }  
  
    private void doDBProcessing() throws InterruptedException {  
        Thread.sleep(5000);  
    }  
}
```


## Syntax:
## Link:
---
Link : [[Advanced]]
Tag: #Advanced #Threads