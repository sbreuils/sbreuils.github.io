---
title: "Software"
permalink: /software/
author_profile: true
header:
    image: "/images/fort point.png"
---


## Garamon
stands for Geometric Algebra Recursive Monster. It is a C++ library generator synthesizing efficient C++ libraries implementing geometric algebras in both low and higher dimensions, with any arbitrary metric. The library generator is designed to produce easy to install, easy to use, effective and numerically stable libraries. The design of the libraries is based on a prefix tree data structure and a recursive scheme for high dimensions. You can find some of the tested algebras with references just below.

### Easy to use
Very intuitive way to compute and test Geometric Algebra. Here is an example of computation in the Conformal Geometric Algebra framework reproducing the computation of the horizon as seen by an observer in a view point P:
```cpp
Mvec<double> P  = point<double>(px,py,pz); // view point
Mvec<double> M  = e0<double>(); // center point of the earth
Mvec<double> Sphere = M−0.5*r*r* einf<double>();// sphere representing Earth (center M, radius r)
Mvec<double> K = P + (P | Sphere)*einf<double>();// sphere around P
Mvec<double> circle = Sphere ^ K;// intersecting circle
```

### Tested algebras with references 
All the the following algebras have their own plugin and code that you can use. 

| Initials | CCGA | QCGA | DCGA | DPGA | CGA | STA | PGA |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| handle (short overview )       | cubic curves | quadric surfaces intersection and from control points | quadric surfaces with implicit equation | quadric surfaces and projective transformation  | flats and rounds | Space-time Algebra | Projective geometry |     
| Reference         | [1] | [2] | [3] | [4] | [5] | [6] | [7] |


## Want to test

```
git clone https://github.com/vincentnozick/garamon.git
```



## Want to know the details of the implementation
If you want to know more about how we can use trees with Geometric Algebra or just the details of the implementation, please take a look at this [paper](https://hal.archives-ouvertes.fr/hal-02196173/document).


