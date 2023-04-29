import { MongoClient, ServerApiVersion, Db, Collection, FindCursor } from 'mongodb';
import secrets from "../secrets.json";
import WordTable from '../model/WordTable';
import CategoryTable from '../model/CategoryTable';
import UserTable from '../model/UserTable';
import Query from '../model/Query';


const uri = secrets?.mongoDbClusterConnectionUrl.replace("<password>", secrets?.mongoDbClusterPassword);

class MyMongoClient {
  client: MongoClient
  userTableCollection: Collection<UserTable>;
  wordTableCollection: Collection<WordTable>;
  categoryTableCollection: Collection<CategoryTable>;
  db: Db;

  static instance: MyMongoClient;
  static getInstance(){
    if(MyMongoClient.instance === null) {
      MyMongoClient.instance = new MyMongoClient();
      MyMongoClient.instance.connect();
    }
    return MyMongoClient.instance;
  }

  private constructor() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    this.db = this.client.db(secrets?.mongoDbDatabaseName);
    this.userTableCollection = this.db.collection<UserTable>(secrets?.mongoDbCollections?.UserTableName);
    this.wordTableCollection = this.db.collection<WordTable>(secrets?.mongoDbCollections?.WordTableName);
    this.categoryTableCollection = this.db.collection<CategoryTable>(secrets?.mongoDbCollections?.CategoryTableName);
  }

  async connect() {
    // Connect the client to the server	(optional starting in v4.7)
    await this.client.connect();
    // Send a ping to confirm a successful connection
    await this.client.db(secrets.mongoDbClusterUsername).command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }

  async close() {
    await this.client.close();
    console.log("Closed connection to MongoDB!");
  }

  // addOrEditWord
  async addOrEditWord(word: WordTable){
    let json = word.toJson();
    const options = { upsert: true }; // insert if not present
    const filter = { word: word.word };
    const doc = {
      $set: json
    }
    const result = await this.wordTableCollection.updateOne(filter, doc, options);
    console.log(result);
  }

  // addOrEditCategory
  async addOrEditCategory(category: CategoryTable){
    let json = category.toJson();
    const options = { upsert: true }; // insert if not present
    const filter = { category: category.category};
    const doc = {
      $set: json
    }
    const result = await this.wordTableCollection.updateOne(filter, doc, options);
    console.log(result);
  }

  // deleteWord
  async deleteWord(word: string, emailId: string) {
    const query = { word: word, emailId: emailId };
    const result = await this.wordTableCollection.deleteOne(query);
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  }

  // TODO: deleteCategory - category needs to be cascade deleted from words it has been associated with in the WordTable

  // getAllCategories
  async getAllCategories(emailId: string, nextCallback: (category: CategoryTable | null) => void){
    const query = { emailId: emailId };
    // TODO: Paginate result
    const categoryCursor = this.categoryTableCollection.find<CategoryTable>(query).sort({ category: 1 });

    if(await categoryCursor.hasNext()){
      nextCallback(await categoryCursor.next());
    }
  }

  async getWord(wordString: string, emailId: string) {
    const query = { emailId: emailId, word: wordString };
    const word = await this.wordTableCollection.findOne<WordTable>(query);
    if(word === null){
      throw new Error('WordNotFound');
    }
    return word as WordTable;
  }

  // searchWords
  async searchWords(query: Query, nextCallback: (word: WordTable | null) => void){
    let q = query.get();

    let aggregationCursor = await this.wordTableCollection.aggregate<WordTable>(q);

    if(await aggregationCursor.hasNext()){
      nextCallback(await aggregationCursor.next());
    }
  }
}

export default MyMongoClient;





