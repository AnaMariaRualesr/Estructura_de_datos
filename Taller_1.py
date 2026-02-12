#  Taller_1: arreglos unidimensionales y bidimensionales.

class TallerArreglos:

    def __init__(self):
        # 1a. Arreglo unidimensional de tamaño 5
        self.arreglo_unidimensional = [10, 20, 30, 40, 50]

        # 1b. Arreglo bidimensional 3x3
        self.arreglo_bidimensional = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]

    # 2a y 2b - Acceso a elementos
    def acceder_elementos(self):
        print("Segundo elemento del arreglo unidimensional:",
              self.arreglo_unidimensional[1])

        print("Elemento de la segunda fila y segunda columna:",
              self.arreglo_bidimensional[1][1])

    # 3a - Inserción
    def insertar_elemento(self):
        self.arreglo_unidimensional.insert(2, "Estructura de datos")
        print("Arreglo unidimensional después de insertar:",
              self.arreglo_unidimensional)

    # 3b - Eliminación
    def eliminar_elemento(self):
        del self.arreglo_bidimensional[2][2]
        print("Arreglo bidimensional después de eliminar:",
              self.arreglo_bidimensional)

    # 4a - Búsqueda en arreglo unidimensional
    def buscar_en_unidimensional(self):
        if "Estructura de datos" in self.arreglo_unidimensional:
            indice = self.arreglo_unidimensional.index("Estructura de datos")
            print("Índice en el arreglo unidimensional:", indice)
        else:
            print("El valor no se encontró en el arreglo unidimensional.")

    # 4b - Búsqueda en segunda fila del bidimensional
    def buscar_en_segunda_fila(self, valor):
        if valor in self.arreglo_bidimensional[1]:
            indice = self.arreglo_bidimensional[1].index(valor)
            print("Índice en la segunda fila del arreglo bidimensional:", indice)
        else:
            print("El valor no se encontró en la segunda fila.")

    # Método principal
    def ejecutar(self):
        self.acceder_elementos()
        self.insertar_elemento()
        self.eliminar_elemento()
        self.buscar_en_unidimensional()
        self.buscar_en_segunda_fila(5)


if __name__ == "__main__":
    taller = TallerArreglos()
    taller.ejecutar()

