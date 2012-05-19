#**JavaScript Static Analysis Tool**
#Readme

Last Updated: May 18, 2012

This package is a suite of tools to analyze JavaScript code statically. This 
was originally developed to analyze Google Chrome extensions.

The program is developed in Python 2.7 to maintain compatibility with 
`pynarcissus`.

##Table of Contents:  
1.  Sub-Modules
	1.  alpharenamer.py
	2.  analyzer.py
	3.  astutils.py
	4.  converter.py
	5.  driver.py
	6.  fileutils.py
	7.  threeaddress.py
2.  Example Runs
	1.  threeaddress.py

##Sub-Modules:

-	*driver.py*  
    This is the main module of this suite of analysis tools, and should be used
    as the starting point. Use the following command:
        
        `python driver.py -h`

    to learn about the various options provided by driver.py

    This module takes a JavaScript file or an extension folder, performs alpha-
    renaming on the code, then generates three-address code representations of
    the whole JavaScript code, then turns it into a list of Datalog facts. 
	
-------------------------------------------------------------------------------

- 	*alpharenamer.py*  
	Utility to alpha-rename JavaScript files. It has the following core 
	functions:
	
	+	`create_frames(ast)`  
		Creates a Frame object that is required to perform alpha-renaming. 
		The input is an AST generated by pynarcissus.
	+ 	`alpha_rename(frame, ast)`  
		Performs alpha-renaming on the code represented by the Frame object,
		and performs necessary changes on the AST also.

-------------------------------------------------------------------------------

-	*analyzer.py*  
	An older static analyzer tool that only counts the occurrences of "chrome"
	in a given JavaScript file. Obsolete.

-------------------------------------------------------------------------------

-	*astutils.py*  
	A module to work with `pynarcissus`' AST. This is the entry point of most of
	the other modules in this program. It has the following core functions:
	
	+ 	`create_AST(js_path)`  
		Creates a pynarcissus AST from the JavaScript file specified in 
		js_path.
	+	`create_AST_from_string(string)`  
		Creates a pynarcissus AST from a string containing JavaScript code.
	+ 	`traverse_AST(node, fn, postfn)`  
		Traverses the whole pynarcissus AST, executing fn and postfn in 
		pre-order and post-order respectively. Functions passed onto the fn 
		and postfn argument have to have the signature: `fn(node)`. 
	+ 	`traverse_AST_level(node, fn, postfn, level)`  
		Similar to above, except the traverse keeps track of the recursion 
		depth. Functions passed onto fn and postfn arguments have to have the 
		following signature: `fn(node, level)`

-------------------------------------------------------------------------------

-	*converter.py*  
	A simple converter module to convert data from the log file generated by 
	this program in this format:
	
	    Extension Name: Clip to Evernote
	    Extension Identifier: pioclpoplcdbaefihamjohnefbikjilc
		Number of functions: 4241
		Number of anonymous functions: 4009
		Number of named functions: 232
		Number of functions that reference chrome: 170
	
	to this format:
	
		Clip to Evernote & 4241 & 170 & 4.0 \\ \hline

-------------------------------------------------------------------------------

-	*fileutils.py*  
	A generic utility to work with files and directories.
	
-------------------------------------------------------------------------------

-	*threeaddress.py*  
	The latest addition (3/5/2012) to this collection of tools. Performs limited
	three address conversion of a JavaScript file. This tool ignores control 
	flow.
	
-------------------------------------------------------------------------------

-   *datalog.py*  
    Implements the Datalog rules found in Microsoft's Gatekeeper paper. This
    section tries to describe the predicates found in the points-to analysis
    found in the module.  

    Let the following domains be defined for these predicates:
    +   H : heap-allocated objects and functions 
    +   V : program variables 
    +   I : call sites 
    +   F : fields 
    +   Z : integers 
    
    The following descriptions of predicates uses the domain definitions
    described above:  
    +   calls(i : I, m : H)  
        Call site i invokes method m.  
    +   formal(m : H, z : Z, v : V)  
        Indicates that the z-th formal parameter of method m is v.  
    +   methodRet(m : H, v : V)  
        The return parameter of method m is v.  
    +   actual(i : I, z : Z, v : V)  
        At call site i, the z-th actual parameter (argument) is v.  
    +   callRet(i : I, v : V)  
        The return value of a function call at call site i is v.  
    +   declaredIn(i : I, m : H)  
        Call site i is located in method m.  
    +   assign(v1 : V, v2 : V)  
        Records variable assignment of the form v1 = v2.  
    +   load(v1 : V, v2: V, f : F)  
        Records the load operation v1 = v2.f  
    +   store(v1 : V, f : F, v2 : V)  
        Records the store operation v1.f = v2  
    +   ptsTo(v : V, h : H)  
        Variable v **may point to** heap variable h.  
    +   heapPtsTo(h1 : H, f : F, h2 : H)  
        The field f of heap variable h1 (h1.f) may point to heap variable h2.  
    +   prototype(h1 : H, h2 : H)  
        The implicit prototype for object h1 may be h2.  
        

-------------------------------------------------------------------------------

##Example Runs  

-   *threeaddress.py*  
	This module takes a JavaScript file or an extension path as the positional 
	argument. For example, to run the tests provided with the suite, simply 
	use the following command:
	
		python threeaddress.py ../tests/threeaddress/basic.js
	    
	For more help, use the following command:
	
		python threeaddress.py -h
