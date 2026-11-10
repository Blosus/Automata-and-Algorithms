#include <stdio.h>
#include <limits.h>

#define V 5
#define INF 1000000

void bellmanFord(int grafo[V][V], int fuente) {
    int dist[V];

    for (int i = 0; i < V; i++) {
        dist[i] = INF;
    }
    dist[fuente] = 0;

    for (int iter = 1; iter <= V - 1; iter++) {
        for (int u = 0; u < V; u++) {
            for (int v = 0; v < V; v++) {
                if (grafo[u][v] != INF && dist[u] != INF &&
                    dist[u] + grafo[u][v] < dist[v]) {
                    dist[v] = dist[u] + grafo[u][v];
                }
            }
        }
    }

    for (int u = 0; u < V; u++) {
        for (int v = 0; v < V; v++) {
            if (grafo[u][v] != INF && dist[u] != INF &&
                dist[u] + grafo[u][v] < dist[v]) {
                printf("El grafo contiene un ciclo negativo\n");
                return;
            }
        }
    }

    printf("Distancias desde el nodo %d:\n", fuente);
    for (int i = 0; i < V; i++) {
        if (dist[i] == INF)
            printf("Nodo %d: INFINITO\n", i);
        else
            printf("Nodo %d: %d\n", i, dist[i]);
    }
}

int main() {
    int grafo[V][V] = {
        {0,   -1,   4,  INF,  INF},
        {INF,  0,   3,   2,    2 },
        {INF, INF,  0,   5,  INF},
        {INF,  1, INF,   0,  INF},
        {INF, INF, INF, -3,    0 }
    };

    int fuente = 0;
    bellmanFord(grafo, fuente);

    return 0;
}
