export interface Users{
    
        id: string,
        userName: string,
        normalizedUserName: string,
        email: string,
        normalizedEmail: string,
        emailConfirmed: true,
        passwordHash: string,
        securityStamp: string,
        concurrencyStamp: string,
        phoneNumberConfirmed: boolean,
        twoFactorEnabled: boolean,
        lockoutEnd: string,
        lockoutEnabled: boolean,
        accessFailedCount: number,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        role: string,
      
}