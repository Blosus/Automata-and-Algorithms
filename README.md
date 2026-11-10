# Automata and Algorithms

Ejercicios de teoría de la computación y algoritmos de grafos.

## Simulador de lavadora (autómata finito) — `lavadora-automata/`

Simula una lavadora como un autómata finito determinista con estados `q0` a `q7` (Apagado, Encendido, Ligero, Medio, Grande, Suave, Fuerte, Drenar y Exprimir) y el alfabeto `a`–`e`.

- Modo manual: cada estado muestra solo los botones de sus transiciones válidas.
- Modo palabra: carga una cadena (por ejemplo `aaaaae`) y recórrela paso a paso o en automático sobre una "cinta" visual. Al final indica si la palabra termina en `q0`.

**Demo en vivo:** https://blosus.github.io/Automata-and-Algorithms/lavadora-automata/

HTML, CSS y JavaScript sin dependencias: también basta con abrir `lavadora-automata/index.html`.

## Bellman-Ford — `bellman-ford/`

Implementación en C del algoritmo de Bellman-Ford sobre una matriz de adyacencia de 5 nodos con pesos negativos. Calcula las distancias mínimas desde un nodo fuente y detecta ciclos negativos.

```bash
gcc -Wall -o bellman_ford bellman-ford/bellman_ford.c
./bellman_ford
```

Salida esperada:

```
Distancias desde el nodo 0:
Nodo 0: 0
Nodo 1: -1
Nodo 2: 2
Nodo 3: -2
Nodo 4: 1
```
