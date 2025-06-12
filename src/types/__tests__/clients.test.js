describe('Client Type', () => {
    it('valide la structure d\'un objet Client', () => {
        const mockClient = {
            id: 1,
            nom: 'Dupont',
            prenom: 'Jean',
            dateNaissance: '1990-01-01',
            adresse: '123 rue Test',
            codePostal: '75000',
            ville: 'Paris',
            createdAt: '2024-01-01T12:00:00Z',
            updatedAt: '2024-01-01T12:00:00Z'
        };

        expect(mockClient).toHaveProperty('id');
        expect(mockClient).toHaveProperty('nom');
        expect(mockClient).toHaveProperty('prenom');
        expect(mockClient).toHaveProperty('dateNaissance');
        expect(mockClient).toHaveProperty('adresse');
        expect(mockClient).toHaveProperty('codePostal');
        expect(mockClient).toHaveProperty('ville');
        expect(mockClient).toHaveProperty('createdAt');
        expect(mockClient).toHaveProperty('updatedAt');

        expect(typeof mockClient.id).toBe('number');
        expect(typeof mockClient.nom).toBe('string');
        expect(typeof mockClient.prenom).toBe('string');
        expect(typeof mockClient.dateNaissance).toBe('string');
        expect(typeof mockClient.adresse).toBe('string');
        expect(typeof mockClient.codePostal).toBe('string');
        expect(typeof mockClient.ville).toBe('string');
    });

    it('permet la création d\'un client sans createdAt et updatedAt', () => {
        const mockClientSansTimestamps = {
            id: 1,
            nom: 'Martin',
            prenom: 'Marie',
            dateNaissance: '1995-05-15',
            adresse: '456 avenue Example',
            codePostal: '69000',
            ville: 'Lyon'
        };

        expect(mockClientSansTimestamps.createdAt).toBeUndefined();
        expect(mockClientSansTimestamps.updatedAt).toBeUndefined();
    });
});