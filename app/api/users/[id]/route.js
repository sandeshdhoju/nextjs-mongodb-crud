import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb'
import {ObjectId} from 'mongodb';

export async function DELETE(request, { params }) {
    const { id } = params;

    try {
        const client = await clientPromise;
        const db = client.db('user');
        const result = await db.collection('users').deleteOne(
            {_id: new ObjectId(id)}
        );
        if(result.deletedCount > 0) {
            return NextResponse.json({ message: `User with ID ${id} deleted successfully.` });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting user', error: error.message }, { status: 500 });
    }
}