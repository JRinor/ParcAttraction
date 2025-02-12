Gérer l'état des attractions visible pas visible sur l'écran des visiteurs:


dans la page acceuil/acceuil.compoment.ts on affiche les attractions:
export class AccueilComponent {

  constructor(public attractionService: AttractionService)
  {}
  
  public attractions: Observable<AttractionInterface[]> = this.attractionService.getAllAttraction()
}


donc on récupère les attractions grace a la function getAllAttraction()

cette fonction on l'initialise dans:
  public getAllAttraction() : Observable<AttractionInterface[]> {
    const url = "http://127.0.0.1:5000/attraction"
    const data = this.dataService.getData(url);
    return data as Observable<AttractionInterface[]>;
  }

et du coup elle fait appel a notre backend gérer par python:
@app.get('/attraction')
def getAllAttraction():
    result = attraction.get_all_attraction()
    return result, 200

et cette fonction python fait appel a une autre fonction qui est:
def get_all_attraction():
    json = req.select_from_db("SELECT * FROM attraction")

Donc ici on voit que ce qui est rechercher dans la base de donnée c'est toutes les attractions de notre table.

voici la table:
CREATE TABLE attraction (
    attraction_id int auto_increment,
    primary key(attraction_id),
    nom varchar(255) not null,
    description varchar(255) not null,
    difficulte int,
    visible bool default true
);


donc on voit que on a déjà un bool qui gére la visibilité dans notre table, donc maintenant je vais refaire l'achinimement inverse mais avec une nouvelle fonction que je créer qui va récuperer seulement les attractions visiblent.

1)
def get_all_visible_attraction():
    json = req.select_from_db("SELECT * FROM attraction WHERE visible = 1")
    
    return json

2)
@app.get('/attraction/visible')
def getAllVisibleAttraction():
    result = attraction.get_all_visible_attraction()
    return result, 200

3)
  public getAllVisibleAttraction() : Observable<AttractionInterface[]> {
    const url = "http://127.0.0.1:5000/attraction/visible"
    const data = this.dataService.getData(url);
    return data as Observable<AttractionInterface[]>;
  }

4) ici je modifie la fonction appelé
export class AccueilComponent {

  constructor(public attractionService: AttractionService)
  {}
  
  public attractions: Observable<AttractionInterface[]> = this.attractionService.getAllVisibleAttraction()
}



Mise en place des critiques pour les attractions

je commence par créer une nouvelle table pour les critiques

la prochaine fois il faut que je créer l'interface pour pouvoir visionner les commentaires et les notes.
