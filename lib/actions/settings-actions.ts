"use server"

import { revalidatePath } from "next/cache"

export interface StoreSettings {
  general: {
    storeName: string
    contactEmail: string
    contactPhone: string
    storeAddress: string
    currency: string
    logo?: string
  }
  shipping: {
    methods: {
      standard: {
        enabled: boolean
        price: number
        estimatedDays: string
      }
      express: {
        enabled: boolean
        price: number
        estimatedDays: string
      }
      free: {
        enabled: boolean
        minimumOrder: number
      }
    }
    countries: "worldwide" | "domestic" | "custom"
    customCountries?: string[]
  }
  payment: {
    methods: {
      creditCard: boolean
      paypal: boolean
      applePay: boolean
    }
    currency: string
  }
  tax: {
    enabled: boolean
    displayPrices: "including" | "excluding"
    defaultRate: number
    regions: Array<{
      name: string
      country: string
      rate: number
    }>
  }
  notifications: {
    admin: {
      newOrder: boolean
      lowStock: boolean
      newCustomer: boolean
    }
    customer: {
      orderConfirmation: boolean
      shippingUpdates: boolean
      abandonedCart: boolean
      marketing: boolean
    }
  }
}

// Mock store settings
const storeSettings: StoreSettings = {
  general: {
    storeName: "E-Store",
    contactEmail: "support@estore.com",
    contactPhone: "+1 (555) 123-4567",
    storeAddress: "123 Commerce Street, Suite 500, New York, NY 10001, United States",
    currency: "usd",
  },
  shipping: {
    methods: {
      standard: {
        enabled: true,
        price: 5.99,
        estimatedDays: "3-5 business days",
      },
      express: {
        enabled: true,
        price: 14.99,
        estimatedDays: "1-2 business days",
      },
      free: {
        enabled: true,
        minimumOrder: 50,
      },
    },
    countries: "worldwide",
  },
  payment: {
    methods: {
      creditCard: true,
      paypal: true,
      applePay: false,
    },
    currency: "usd",
  },
  tax: {
    enabled: true,
    displayPrices: "including",
    defaultRate: 8.5,
    regions: [
      {
        name: "New York",
        country: "United States",
        rate: 8.875,
      },
      {
        name: "California",
        country: "United States",
        rate: 7.25,
      },
    ],
  },
  notifications: {
    admin: {
      newOrder: true,
      lowStock: true,
      newCustomer: false,
    },
    customer: {
      orderConfirmation: true,
      shippingUpdates: true,
      abandonedCart: true,
      marketing: true,
    },
  },
}

export async function getStoreSettings() {
  // In a real app, this would fetch from a database
  return { ...storeSettings }
}

export async function updateGeneralSettings(settings: StoreSettings["general"]) {
  try {
    // Validate settings
    if (!settings.storeName || !settings.contactEmail) {
      return { error: "Store name and contact email are required" }
    }

    // Update settings
    storeSettings.general = {
      ...storeSettings.general,
      ...settings,
    }

    // Revalidate settings page
    revalidatePath("/admin/settings")

    return { success: true, settings: storeSettings.general }
  } catch (error) {
    console.error("Failed to update general settings:", error)
    return { error: "Failed to update general settings" }
  }
}

export async function updateShippingSettings(settings: StoreSettings["shipping"]) {
  try {
    // Update settings
    storeSettings.shipping = {
      ...storeSettings.shipping,
      ...settings,
    }

    // Revalidate settings page
    revalidatePath("/admin/settings")

    return { success: true, settings: storeSettings.shipping }
  } catch (error) {
    console.error("Failed to update shipping settings:", error)
    return { error: "Failed to update shipping settings" }
  }
}

export async function updatePaymentSettings(settings: StoreSettings["payment"]) {
  try {
    // Update settings
    storeSettings.payment = {
      ...storeSettings.payment,
      ...settings,
    }

    // Revalidate settings page
    revalidatePath("/admin/settings")

    return { success: true, settings: storeSettings.payment }
  } catch (error) {
    console.error("Failed to update payment settings:", error)
    return { error: "Failed to update payment settings" }
  }
}

export async function updateTaxSettings(settings: StoreSettings["tax"]) {
  try {
    // Update settings
    storeSettings.tax = {
      ...storeSettings.tax,
      ...settings,
    }

    // Revalidate settings page
    revalidatePath("/admin/settings")

    return { success: true, settings: storeSettings.tax }
  } catch (error) {
    console.error("Failed to update tax settings:", error)
    return { error: "Failed to update tax settings" }
  }
}

export async function updateNotificationSettings(settings: StoreSettings["notifications"]) {
  try {
    // Update settings
    storeSettings.notifications = {
      ...storeSettings.notifications,
      ...settings,
    }

    // Revalidate settings page
    revalidatePath("/admin/settings")

    return { success: true, settings: storeSettings.notifications }
  } catch (error) {
    console.error("Failed to update notification settings:", error)
    return { error: "Failed to update notification settings" }
  }
}

