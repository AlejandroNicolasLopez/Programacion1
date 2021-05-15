from random import randint
lista = []

for i in range (0,78):
    numero = randint(1,200)
    lista.append(numero)

lista.sort()

print ("El numero menor es :",lista[0])
print ("El numero mayor es :",lista[77])

print(lista)
for lista in range (0,78):
    if (lista % 2==0):
        print(lista)