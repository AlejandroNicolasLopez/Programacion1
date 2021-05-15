
import json
import requests
import random

def get_carter_by_id(id):
    respuesta = requests.get('https://swapi.dev/api/people/'+str(id))
    if respuesta.status_code == 200:
        dic = json.loads(respuesta.text)
        return dic


def get_random_character():
    randomCharacterId = random.randrange(1, 82, 2)
    character = get_carter_by_id(randomCharacterId)
    return character

def main():
    personaje1 = get_random_character()
    personaje2 = get_random_character()

    tallestCharacter = personaje1 if personaje1['height'] > personaje2['height'] else personaje2
    heaviestCharacter = personaje1 if personaje1['mass'] > personaje2['mass'] else personaje2
    beenInMoreMovies = personaje1 if len(personaje1['films']) > len(personaje2['films']) else personaje2

    print('El mas alto es: ' + str(tallestCharacter.get('name')))
    print('El mas pesado es: ' + str(heaviestCharacter.get('name')))
    print('El que estuvo en mas peliculas es: ' + str(beenInMoreMovies.get('name')))

    if personaje1['name'].find('Yoda') > -1 or personaje2['name'].find('Yoda') > -1:
          print('Yoda esta entre los personajes')

    if personaje1['name'].find('Grievous') > -1 or personaje2['name'].find('Grievous') > -1:
      print('Yoda esta entre los personajes')
        
main()

