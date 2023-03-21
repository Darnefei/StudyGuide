---
title: Functional Programming
tag: Advanced
publish: false
creation date: 2023-03-09 09:53
modification date: Tuesday 21st March 2023 13:46:19
---


## Definition:

Specify what you want instead of dealing with the state of object.
Focus on expression not on loops.
Uses context for type defintion (see inteface CheckTraits)

## Example:

Animal as Model:

```java {post}
record Animal (
	String species,
	boolean canHop,
	boolean canSwim
) { }

```

Check the traits of an animal:

```java {post}
interface CheckTrait{
	boolean test (Animal a);
}

class CheckIfHopper implements CheckTrait {

	public boolean test(Animal a){
		return a.canHop();
	}
}
```

Check for Animal that can hop:
```java
class StartPoint {
 public void run (String[] args) {
	 var animals = new ArrayList<Animal>();
	animals.add(new Animal("fish", false, true));
	animals.add(new Animal("dog", true, false));
	print(animals, new CheckIfHopper());
 }
 private static void print(List<Animal> animals, CheckTrait checker){
	 for (Animal animal : animals){
		 if (checker.test(animal)){
			System.out.print(animal + " ");
		}
		System.out.println("");
	}
 }
}
```

With lambda expressions:

```java

class StartPoint {
 public void run (String[] args) {
	 var animals = new ArrayList<Animal>();
	animals.add(new Animal("fish", false, true));
	animals.add(new Animal("dog", true, false));
	print(animals, a -> a.canHop());
 }
private static void print(List<Animal> animals, CheckTrait checker){
	for (Animal animal : animals){
		if (checker.test(animal)){
			System.out.print(animal + " ");
		}
		System.out.println("");
	}
	
}
}

```



## Syntax:
---
> [!info]
>**_Note_**:
>Lambdas work with interfaces that have exatcly ONE abstract method!

---
> when declaring lambdas all parameters must be declard or none must be declared. If using var all variables have to use var :  (var x, var y)  or (x, y) or (String x, String y) are allowed, (var x, y) is not!

*Expression Example:*
a -> a.canHop();  is the same as:
(Animal a) -> { return a.canHop(); }
```plantuml

label a
label arrow as "->"
label method as "a.canHop()"
label ParameterName as "Parameter Name"
label Body
label Arrow

Body -up-> method
Arrow -up-> arrow
ParameterName -up-> a
```

> s -> { } is also a valid lambda.

*More examples:*

| Lambda                                    | # of parameters | Information                                      |
|-------------------------------------------|-----------------|--------------------------------------------------|
| () -> true                                | 0               | always true                                      |
| x -> x.startsWith("test")                 | 1               | needs one undefined parameter                    |
| (String x) -> x.startsWith("test")        | 1               | needs one defined parameter                      |
| (x, y) -> { return x.startsWith("test");} | 2               | needs two parameters, but ignores the second one | 

## Coding functional interfaces

In Java interfaces with exaclty one abstract method are called *functioncal interfaces*, also called SAM (single abstract method).

In Java such interfaces are annotated with @FunctionalInterface. This annotation only helps users, but it is not necessary. It will also throw an error if a interface with this annotation is not a functional interface.

```java
@FunctionalInterface
public interface Swim{
	public void swim(int length);
}

public interface Dive extends Swim {} // <--- still a fun. interface

public interface Run extends Swim { // <-- not a fun. interface -> 2 abstract methods
	private void running() {};
}

public interface Walking { // <-- fun. interface ONLY 1 abstract method
	void walking();
	default void stoping() {};
	static int startWalkingAgain() {return 1;}
	private static boolean isWalking() {return true;}
}

```

> Object Class methods can not be used as the abstract method in func. Interfaces (such as toString, equals, hashCode).

```java
public interface Walking { // would still compile because the Object methods are NOT abstract
	public toString();
	public boolean equals(Object o);
	public abstract int hashCode();
	void walking();
}

```

## Method Reference:

Lambda annotations could also be writen like this:
```java
MyNewObject printer = s -> System.out.println(s);

// we could also write following instead:

MyNewObject printer = System.out::println;
```

> Lambda and method reference behave the same at runtime

> There are 4 formats of method references:
>> static methods
>> Instance methods on particular objects
>> Instance methods on parameter to be determined at runtime
>> Constructors

### Static Methods:
``` java
interface MathOperation {
	public long operation(double number);
}

class StartPoint{
	public void run(String[] args){
		MathOperation methodReference = Math::round;
		MathOperation lambda = x -> Math.round(x);

		System.out.println(methodReference.operation(10.12));
		System.out.println(lambda.operation(10.12));
	}
}

```

> Math.round is overloaded. With the *context* of the Functional Interface Java knows witch type should be used.

### Instance methods on particular objects
For example on the Object String:
```java
interface StringContains {
// method with 1 input
	public boolean containsCheck(String find);
}

interface CheckEmpty {
    public boolean isEmpty();
}

class StartPoint {
	public void run(String[] args) {
		var searchString = "yes";
		StringContains method = searchString::contains;
		StringContains lambda = s -> searchString.contains(s);
		
		System.out.println(method.containsCheck("no") + " " +
		lambda.containsCheck("yes"));

		CheckEmpty method2 = searchString::isEmpty;
		CheckEmpty lambda2 = () -> searchString.isEmpty();
		System.out.println(method2.isEmpty() + " " +
		lambda2.isEmpty());

	}
}
```
> not all lambda can be writen as method references ( methodRef ⊂ lambda)

for example:

```java
interface CheckEmpty {
    public boolean isEmpty();
}

class StartPoint {
	public void run(String[] args) {
		var searchString = "yes";

		
		CheckEmpty lambda = () -> searchString.startsWith("no");
		CheckEmpty method = searchString::startsWith; //throws error
		CheckEmpty method2 = searchString::startsWith("no"); //throws error

	}
}

```

### Instance Methods on a Parameter

```java
interface StringContains {
// method can have multiple inputs
	public boolean containsCheck(String find);
}

class StartPoint {
	public void run(String[] args) {
		StringContains method = String::isEmpty;
		StringContains lambda = s -> s.isEmpty();
		
		System.out.println(method.containsCheck("") + " " +
		lambda.containsCheck("yes")); // "" and "yes" are the parameters

	}
}

```

### Constructors
> Must have empty Constructor
> e.g.: StringContains method = String::Empty;  // -> Will create a empty String


## Build-in Functional Interfaces:

| Function Type       	| Return Type 	| Method name 	| # of parameter 	| Usage:                                   	| Convenience Method  	|
|---------------------	|-------------	|-------------	|----------------	|------------------------------------------	|---------------------	|
| Supplier&#60;T>     	| T           	| get()       	| 0              	| Pass nothing, get something              	|  - / -              	|
| Consumer&#60;T>          	| void        	| accept()    	| 1 (T)          	| Just consume, return nothing             	| andThen(C)           	|
| BiConsumer&#60;T, U>    	| void        	| accept()    	| 2 (T, U)       	|                                          	| andThen(C)           	|
| Predicate&#60;T>        	| boolean     	| test(T)     	| 1 (T)          	| On conditional statements                	| and(P), or(P), negate() 	|
| BiPredicate&#60;T, U>   	| boolean     	| test(T,U)   	| 2 (T, U)       	|                                          	|                     	|
| Function&#60;T, R>      	| R           	| apply(T)    	| 1 (T)          	| Perform Operation, Get Result            	| andThen(F),compose(F) 	|
| BiFunction&#60;T, U, R> 	| R           	| apply(T, U) 	| 2 (T, U)       	|                                          	| andThen(F),compose(F)                    	|
| UnaryOperator&#60;T>    	| T           	| apply(T)    	| 1 (T)          	| Same as Function but with the same types 	| andThen(F),compose(F)                     	|
| BinaryOperator&#60;T>   	| T           	| apply(T, T) 	| 2 (T,T)        	| Same types for inputs + output           	| andThen(F),compose(F)                     	|


## Functional Interface for Primitives

> Primitives: double, int, long AND Boolean(Supplier)

### BooleanSupplier

```java
@FunctionalInterface  
public interface BooleanSupplier {  
   boolean getAsBoolean();
}

// Example:
int x = Math.random() * 10 
BooleanSupplier bs = () -> x > 5;
```

### double, long, int Primitives

```java
class StartPoint {  
    public void run(String[] args) {  
        BooleanSupplier bs = () -> true;  
        BooleanSupplier bs2 = () -> Math.random() > 0.3;  
  
        IntConsumer ic = System.out::println;  
        IntSupplier is = () -> 10;  
        IntPredicate ip = x -> x > 10;  
        IntFunction<String> iF = Integer::toString;  
        IntUnaryOperator iuo = x -> x + 10;  
        IntBinaryOperator ibo = (x, y) -> {  
            int n = 10;  
            return x - y + n;  
        };  
        ic.accept(10);  
        System.out.println(  
                "is: " + is.getAsInt() + "\n"  
                        + "ip: " + ip.test(9) + ip.test(11)  
                        + "\niF: " + iF.apply(10)  
                        + "\niuo: " + iuo.applyAsInt(-10)  
                        + "\nibo: " + ibo.applyAsInt(20, 30)  
        );  
    }  
}
```

> For each of the Primitives there are all basic functions of the given functional Interfaces
> The Type must not be declared (expect the return value for Function).


### Primitive Specific func. Interfaces:

> Interfaces to swap / map between primitives:

_TYPE_ is for Double / Int / Long

| Function | method |
| ---------| ----------- |
| To_TYPE_Function\<T>, | applyAS_TYPE_(T) |
|To_TYPE_BiFunction\<T, U> | method applyAs_TYPE_(T, U) |
| TYPE_To_TYPE_Function | method applyAs_TYPE_(_TYPE_) |
| Obj_TYPE_Consumer\<T> | method accept(T, _TYPE_) |

## Links:
Link : [[Advanced]]
Tag: #Advanced #Functional #Programming #FunctionalProgramming