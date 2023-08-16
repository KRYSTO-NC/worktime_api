# BACKEND API WORKTIME MULTI ENTERPRISE

Welcome to the GitHub repository of **BACKEND API WORKTIME MULTI ENTERPRISE**! Based in New Caledonia, this API provides comprehensive solutions for HR management and time tracking.

[🇫🇷 Cliquez ici pour la version française](#version-française)

[Explore the API on Postman](https://www.postman.com/cloudy-water-86970/workspace/workshift)

---

## 📌 Setup & Installation

### 1. Environment Configuration

- Rename `config.env.env` to `config.env`.
- Update the environment variables in `config.env` according to your setup.

### 2. Installation

- Clone this repository to your local machine.
  ``` git clone https://github.com/RFID-NC/worktime_api.git ```
- Navigate to the project directory.
- Run `npm install` to install all dependencies.

### 🚀 3. Running the API

- Use the command `npm run dev` to start the development server.
- For production, use the command `npm start`.

### 4. Seeding the Database

- All seed data is located in the `_data` folder at the root of the project.
- To seed the database, run the seeder script with the command `node seeder -i` to import data, and `node seeder -d` to delete all data.

### 5. Middleware Descriptions

- **Advanced Results**: This middleware provides enhanced results for RESTful APIs. 
  - **Filtering**: Use query parameters like `?location[state]=California` to filter results.
  - **Sorting**: Use the `sort` query parameter like `?sort=name` for ascending or `?sort=-name` for descending order.
  - **Field Selection**: Limit the returned fields with `?select=name,description`.
  - **Pagination**: Use `?page=2&limit=10` to paginate results. The middleware also provides the total number of pages and the current page in the response.
  - **Population**: The middleware can populate data from related collections in MongoDB. For example, if you have user references in your posts collection, it can populate user data for each post.
  - **Advanced filtering**: Use operators like `gt` (greater than), `lt` (less than) in combination with fields to filter. For instance, `?price[gt]=20` will return items with a price greater than 20.
  
- **Async Handler**: A utility to handle asynchronous routes and pass errors to Express's error handling middleware.
- **Auth**: Manages user authentication and includes JWT token verification.
- **Error Handling**: A global error handler for the application.
- **Permissions**: Handles user permissions and roles within the application.

---

## 📞 Contact

If you have any questions or suggestions, please don't hesitate to contact us at 
krysto.contact@gmail.com.

---

⚖️ License

This project is licensed under the MIT License. See the [LICENSE](LINK-TO-LICENSE.md) file for more details.

---

## Version Française

# BACKEND API WORKTIME MULTI ENTREPRISE

Bienvenue sur le dépôt GitHub de **BACKEND API WORKTIME MULTI ENTREPRISE** ! Basé en Nouvelle-Calédonie, cette API offre des solutions complètes pour la gestion des ressources humaines et le suivi du temps.
[Explorer l'API sur Postman](https://www.postman.com/cloudy-water-86970/workspace/workshift)

[🇬🇧 Click here for the English version](#english-version)


## 📌 Configuration & Installation

### 1. Configuration de l'Environnement

- Renommez `config.env.env` en `config.env`.
- Mettez à jour les variables d'environnement dans `config.env` selon votre configuration.

### 2. Installation

- Clonez ce dépôt sur votre machine locale.
    ``` git clone https://github.com/RFID-NC/worktime_api.git ```
- Naviguez vers le répertoire du projet.
- Exécutez `npm install` pour installer toutes les dépendances.

### 🚀 3. Démarrer l'API

- Utilisez la commande
  ```npm run dev ```
  pour démarrer le serveur de développement.
- Pour la production, utilisez la commande 
```npm start```

### 4. Peuplement de la Base de Données

- Toutes les données de seed se trouvent dans le dossier `_data` à la racine du projet.
- Pour peupler la base de données, exécutez le script de seeding avec la commande
     ``` node seeder -i ```
-  pour importer les données et 
     ``` node seeder -d ```
-   pour supprimer toutes les données.

### 5. Description des Middlewares

- **Advanced Results**: Ce middleware offre des résultats améliorés pour les API RESTful.
  - **Filtrage**: Utilisez des paramètres de requête comme `?location[state]=Californie` pour filtrer les résultats.
  - **Tri**: Utilisez le paramètre de requête `sort` comme `?sort=name` pour un ordre croissant ou `?sort=-name` pour un ordre décroissant.
  - **Sélection de champs**: Limitez les champs retournés avec `?select=name,description`.
  - **Pagination**: Utilisez `?page=2&limit=10` pour paginer les résultats. Le middleware fournit également le nombre total de pages et la page actuelle dans la réponse.
  - **Population**: Le middleware peut peupler les données à partir de collections liées dans MongoDB. Par exemple, si vous avez des références utilisateur dans votre collection de publications, il peut peupler les données utilisateur pour chaque publication.
  - **Filtrage avancé**: Utilisez des opérateurs comme `gt` (plus grand que), `lt` (moins que) en combinaison avec des champs pour filtrer. Par exemple, `?price[gt]=20` retournera les articles avec un prix supérieur à 20.
  
- **Async Handler**: Un utilitaire pour gérer les routes asynchrones et passer les erreurs au middleware de gestion des erreurs d'Express.
- **Auth**: Gère l'authentification des utilisateurs et comprend la vérification du token JWT.
- **Gestion des erreurs**: Un gestionnaire d'erreurs global pour l'application.
- **Permissions**: Gère les permissions et les rôles des utilisateurs au sein de l'application.

---

## 📞 Contact

Si vous avez des questions ou des suggestions, n'hésitez pas à nous contacter à
 krysto.contact@gmail.com.

---

⚖️ Licence

Ce projet est sous licence MIT. Voir le fichier [LICENCE](LINK-TO-LICENCE.md) pour plus de détails.
