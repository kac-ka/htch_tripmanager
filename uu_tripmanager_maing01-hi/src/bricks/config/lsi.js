const Lsi = {
  trip: {
    tripInfo: {
      errorHappendAllProviders: {
        cs: "V aplikaci Trip Manager nastala chyba.",
        en: "Error occured in application Trip Manager.",
      },
      errorHappendTripLocation: {
        cs: "Nebyl nalezen žádný výlet.",
        en: "No trip was found.",
      },
      errorHappendTripLocationList: {
        cs: "Nebylo nalezeno žádné ubytování.",
        en: "No location was found.",
      },
    },
    alertBus: {
      successDelete: {
        cs: "Dovolená {0} byla úspěšně smazána.",
        en: "Trip {0} was successfuly deleted.",
      },
      successCreate: {
        cs: "Dovolená {0} byla úspěšně vytvořena.",
        en: "Trip {0} was successfuly created.",
      },
      tripDoesNotExist: {
        cs: "Dovolená {0} neexistuje.",
        en: "Trip {0} does not exist.",
      },
      invalidTripState: {
        cs: "Nelze smazat zájezd, který není ve stavu created.",
        en: "You cannot delete trip that is not in created state.",
      },
      participantListNotEmpty: {
        cs: "Nelze smazat zájezd, ve kterém jsou přidáni účastníci zájezdu.",
        en: "You cannot delete trip with participants already added.",
      },
      tripDeleteError: {
        cs: "Zájezd se nepodařilo smazat.",
        en: "The trip could not be deleted.",
      },
      locationNotInOperation: {
        cs: "Lokalita {0} je aktuálně uzavřená.",
        en: "Location {0} is currently not in operation.",
      },
      tripCreateError: {
        cs: "Zájezd s názvem {0} se nepodařilo vytvořit.",
        en: "The trip with name {0} could not be created.",
      },
      invalidParticipantState: {
        cs: "Účastník musí být aktivní.",
        en: "Participant must be in active state.",
      },
      invalidTripStateAdd: {
        cs: "Zájezd musí být ve stavu created, aby šel přidat účastník.",
        en: "Trip must be in created state to add participants.",
      },
      tripCapacityFull: {
        cs: "Kapacita zájezdu už byla naplněna.",
        en: "Trip capacity has been filled.",
      },
      tripAddParticipantError: {
        cs: "Nepodařilo se přidat účastníka.",
        en: "The participant could not be added.",
      },
    },
    tripContent: {
      createButton: {
        cs: "Vytvořit",
        en: "Create",
      },
      updateButton: {
        cs: "Upravit",
        en: "Edit",
      },
      deleteButton: {
        cs: "Smazat",
        en: "Delete",
      },
      location: {
        cs: "Ubytování: ",
        en: "Location: ",
      },
      description: {
        cs: "Popis: ",
        en: "Description: ",
      },
      state: {
        cs: "Stav: ",
        en: "State: ",
      },
    },
    updateModal: {
      message: {
        cs: "Stránka je ve výstavbě",
        en: "Under construction",
      },
    },
    deleteModal: {
      header: {
        cs: "Smazat",
        en: "Delete",
      },
      submit: {
        cs: "Ano",
        en: "Yes",
      },
      cancel: {
        cs: "Ne",
        en: "No",
      },
      deleteMessage: {
        cs: "Opravdu chcete smazat zájezd?",
        en: "Do you realy want to delete the trip?",
      },
    },
    createModal: {
      header: {
        cs: "Vytvořit nový výlet",
        en: "Create a new trip",
      },
      submit: {
        cs: "Vytvořit",
        en: "Create",
      },
      cancel: {
        cs: "Zrušit",
        en: "Cancel",
      },
      name: {
        cs: "Název",
        en: "Name",
      },
      description: {
        cs: "Popis",
        en: "Description",
      },
      dapartureDate: {
        cs: "Datum odletu",
        en: "Departure date",
      },
      arrivalDate: {
        cs: "Datum příletu",
        en: "Arrival date",
      },
      imageFile: {
        cs: "Obrázek",
        en: "Image",
      },
      locationSelect: {
        cs: "Výběr hotelu",
        en: "Select hotel",
      },
      capacity: {
        cs: "Kapacita výletu",
        en: "Capacity of the trip",
      },
      validation: {
        invalidDepartureDate: {
          cs: "Datum odletu nemůže být z minulosti",
          en: "Departure date cannot be set in the past.",
        },
        invalidArrivalDate: {
          cs: "Datum příletu musí být větší než datum odletu.",
          en: "Arrival date must by greater than departure date.",
        },
        invalidTripName: {
          cs: "Název musí mít alespoň 10 znaků.",
          en: "The name must be at least 10 characters long.",
        },
        capacityIsInvalid: {
          cs: "Kapacita zájezdu musí být větší než nula.",
          en: "Trip`s capacity must be greater than zero.",
        },
        capacityInvalidInput: {
          cs: "Zadaná hodnota musí být číselná.",
          en: "The entered value must be a number.",
        },
        invalidImageInput: {
          cs: "Obrázek není ve správném formátu.",
          en: "The image is not in the correct format.",
        },
      },
    },
  },
  participant: {
    participantList: {
      errorHappendListParticipant: {
        cs: "Nepodařilo se načíst seznam účastníků.",
        en: "Failed to load participant list.",
      },
      errorHappendTrip: {
        cs: "Nebyla nalezena data o účastnících zájezdu.",
        en: "No data about participants was found.",
      },
    },
    alertBus: {
      invalidParticipant: {
        cs: "Účastník neexistuje.",
        en: "Participant does not exist.",
      },
      updateError: {
        cs: "Chyba při editování účastníka {0}",
        en: "Error updating participant {0} ",
      },
      successAddParticipant: {
        cs: "Účatník byl úspěšně přidán do zájezdu.",
        en: "Participant was added succesfuly to the trip.",
      },
      successUpdateParticipant: {
        cs: "Účatník {0} {1} byl úspěšně upraven.",
        en: "Participant {0} {1} was updated succesfuly.",
      },
      deleteUnderConstruction: {
        cs: "Stránka je ve výstavbě.",
        en: "Under construction.",
      },
    },
    addParticipantModal: {
      header: {
        cs: "Přidat účastníka do výletu",
        en: "Add participant to the trip",
      },
      participantSelect: {
        cs: "Vyberte účastníka",
        en: "select participant",
      },
      tripSelect: {
        cs: "Vyberte Výlet",
        en: "Select trip",
      },
      submit: {
        cs: "Odeslat",
        en: "Submit",
      },
      cancel: {
        cs: "Zrušit",
        en: "Cancel",
      },
    },
    updateModal: {
      header: {
        cs: "Editovat účastníka",
        en: "Update participant",
      },
      firstName: {
        cs: "Křestní jméno",
        en: "First name",
      },
      lastName: {
        cs: "Příjmení",
        en: "Last name",
      },
      phoneNumber: {
        cs: "Telefonní číslo",
        en: "Phone number",
      },
      state: {
        cs: "Stav",
        en: "State",
      },
      idCardNumber: {
        cs: "Číslo OP: ",
        en: "ID card number: ",
      },
      submit: {
        cs: "Uložit",
        en: "Submit",
      },
      cancel: {
        cs: "Zrušit",
        en: "Cancel",
      },
      validation: {
        phoneNumberLenght: {
          cs: "Telefonní číslo musí obsahovat alespoň 5 znaků.",
          en: "Phone number must have at least 5 characters",
        },
        idCardLenght: {
          cs: "Číslo OP musí obsahovat alespoň 3 znaky.",
          en: "ID card number must have at least 3 characters",
        },
      },
    },
    gridFilters: {
      filterTripOption: {
        cs: "Zájezd",
        en: "Trip",
      },
      filterTripValue: {
        cs: "Ve výstavbě",
        en: "Under construction",
      },
      filterPartStateOption: {
        cs: "Stav účastníka",
        en: "Participant state",
      },
    },
    gridSort: {
      nameSortValue: {
        cs: "Jméno",
        en: "Name",
      },
      dateOfBirthSortValue: {
        cs: "Datum narození",
        en: "Date of birth",
      },
    },
    tile: {
      dateOfBirth: {
        cs: "Datum narození: ",
        en: "Date of birth: ",
      },
      phoneNumber: {
        cs: "Telefonní číslo: ",
        en: "Phone number: ",
      },
      idCardNumber: {
        cs: "Číslo OP: ",
        en: "ID card number: ",
      },
    },
  },
};

export default Lsi;
