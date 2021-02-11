// mongoDB Object Modelling
import mongoose from "mongoose";

// EDAMAM search query
// https://api.edamam.com/search?q=pizza&app_id=a1bd6451&app_key=31f1c205b4c0de6c1b021ac04c06efe6&from=0&to=9

const recipeSchema = new mongoose.Schema({
  recipe: {
    uri: {
      type: "String",
    },
    label: {
      type: "String",
    },
    image: {
      type: "String",
    },
    source: {
      type: "String",
    },
    url: {
      type: "String",
    },
    shareAs: {
      type: "String",
    },
    yield: {
      type: "Number",
    },
    dietLabels: {
      type: "Array",
    },
    healthLabels: {
      type: ["String"],
    },
    cautions: {
      type: ["String"],
    },
    ingredientLines: {
      type: ["String"],
    },
    ingredients: {
      type: ["Mixed"],
    },
    calories: {
      type: "Number",
    },
    totalWeight: {
      type: "Number",
    },
    totalTime: {
      type: "Number",
    },
    totalNutrients: {
      ENERC_KCAL: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      FAT: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      FASAT: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      FAMS: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      FAPU: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      CHOCDF: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      FIBTG: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      SUGAR: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      "SUGAR.added": {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      PROCNT: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      CHOLE: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      NA: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      CA: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      MG: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      K: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      FE: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      ZN: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      P: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      VITA_RAE: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      VITC: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      THIA: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      RIBF: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      NIA: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      VITB6A: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      FOLDFE: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      FOLFD: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      FOLAC: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      VITB12: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      VITD: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      TOCPHA: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      VITK1: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      WATER: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
    },
    totalDaily: {
      ENERC_KCAL: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      FAT: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      FASAT: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      CHOCDF: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      FIBTG: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      PROCNT: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      CHOLE: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      NA: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      CA: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      MG: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      K: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      FE: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      ZN: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      P: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      VITA_RAE: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      VITC: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      THIA: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      RIBF: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      NIA: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      VITB6A: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      FOLDFE: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      VITB12: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      VITD: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      TOCPHA: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
      VITK1: {
        label: {
          type: "String",
        },
        quantity: {
          type: "Number",
        },
        unit: {
          type: "String",
        },
      },
    },
    digest: {
      type: ["Mixed"],
    },
  },
  bookmarked: {
    type: "Boolean",
  },
  bought: {
    type: "Boolean",
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
