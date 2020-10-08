# API

**Show wars**
---
Returns json of wars

* **URL**

    /wars
    
* **Method**

    GET
    
* **Query parameters**

    * Exact parameters

        commonName type: string
        
        name type: string
        
        numberActors type: integer
        
        totalFatalities type: integer
    
        milFatalities type: integer
        
        startDay type: integer
        
        startMonth type: integer
        
        startYear type: integer
        
        endDay type: integer
            
        endMonth type: integer
            
        endYear type: integer
        
        region type: integer
        
        durationD type: integer
        
        durationM type: integer
        
        durationY type: integer
    
    * Range parameters
    
        numberActorsMore type: integer
    
        numberActorsLess type: integer
        
        milFatalitiesMore type: integer
        
        milFatalitiesLess type: integer
        
        fatalitiesMore type: integer
        
        fatalitiesLess type: integer
        
        durationLess type: integer
        
        durationMore type: integer
        
        warStarted type: integer
        
        warEnded type: integer
    
* **Response**

    * **Content**: `[
    {"_id":"5f7d7e5bbfe64122bc2d01bf",
    "CommonName":"Invasion of Edigey?",
    "Name":"Muscovy-Volga, Tartars, 1406-08",
    "CountryCode":"-1",
    "NumberActors":3,
    "MilFatalities":-1,
    "TotalFatalities":1200,
    "StartYear":1406,
    "StartMonth":-1,
    "StartDay":-1,
    "EndYear":1408,
    "EndMonth":-1,
    "EndDay":-1,
    "Region":4,
    "Century":1,
    "Decade":140,
    "DurationD":-1,
    "DurationM":-1,
    "DurationY":2},
    {War 2 JSON}...
    ]
    `
    
    * **Status code**
    
    200 if succeeded
    
    400 if invalid fields
    
 
**Add war**
----

Adds a war to list and returns json of added war

* **URL**

    /wars

* **Method:**
  
    POST

* **Data:**

    {
    
    commonName: "commonName" type: string
            
    name: "name" type: string REQUIRED
            
    numberActors: "numberActors" type: integer
            
    totalFatalities: "totalFatalities" type: integer
        
    milFatalities: "milFatalities" type: integer
            
    startDay: "startDay" type: integer
            
    startMonth: "startMonth" type: integer
            
    startYear: "startYear" type: integer REQUIRED
            
    endDay: "endDay" type: integer
                
    endMonth: "endMonth" type: integer
                
    endYear: "endYear" type: integer REQUIRED
            
    region: "region" type: integer REQUIRED
            
    durationD: "durationD" type: integer
            
    durationM: "durationM" type: integer
       
    durationY: "durationY" type: integer
    
    }

* **Response:**
  
     * **Content:**
      
     `{JSON of new war}`
     
     * **Status code:**
     
     201 if new war created
     
     400 if invalid data
     
**Update war**
----
Updates war and returns JSON of updated war

* **URL**

    /wars
    
* **Method:**

    PUT
    
* **Data:**

    {
    
    _id: "id" type: string REQUIRED
    
     all fields that needs to be updates. (check all fields from Add war)
    
    }

* **Response**

    * **Content:** 
    
    `{Updated War JSON}`
    
    * **Status code**

    200 if updated
    
    400 if invalid data
    
**Delete war**
----

Delete war from database

* **URL**

    /wars/:id
    
* **Method:**

    DELETE
    
* **URL params**

    id wars _id type: string
    
* **Response**

    * **Content:**
    
    `{Deleted War JSON}`

    **Status code**: 
    
    204 if war deleted
    
    400 if invalid data