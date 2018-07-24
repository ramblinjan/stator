
# Stator

WIP.

Coming soon: a highly capable state-based routing library that simply treats
the URI as an interface to application state, represented by a single object.

Inspired by [can-route](https://canjs.com/doc/can-route.html).

## Design goals

  * The death of "declarative routing"
  * One-time route configuration at the entry point of an application
  * Simple-by-default integration for major frameworks
  * Eventually, integration with observable libaries such as RxJS
  * Eventually eventually, first-class integration with Redux

## Design anti-goals

  * Documentation that uses the word "just" or "simply"
  * "Blazing fast"
  * Literally any feature that encourages route definitions to happen all over an application

## Why "stator"?

Honest answer: I'm obsessed with state management and only recently learned what a stator was when working on
my "new" 1980 Honda CB650.
web.

Deeper answer: In an electric generator, the stator remains motionless while a rotor turns, generating electric current.
The stator is the stationary part of a system that converts kinetic energy into electricity. 

As an auto engine runs, the rotor spins, electrons are excited in the stator (usuaully) generating alternating current,
a rectifier converts that into direct current, a 12v battery is charged, and elecrical components run off that battery.

A system with a single path of travel for any give purpose is easier to understand and repair. That's the basis of modern
best practices for the web. This project seeks to make routing in a complex app feel more like the engine on a classic motorcycle.
