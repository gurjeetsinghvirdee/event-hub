import { useState, startTransition } from 'react';
import { ICategory } from '../../lib/database/models/category.model';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Input } from '../ui/input';

type DropdownProps = {
    value?: string
    onChangeHandler?: () => void
}

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [newCategory, setNewCategory] = useState(``);
    const handleAddCategory = async () => {
        
    }

    return (
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.length > 0 && categories.map((category) => (
            <SelectItem key={category._id} value={category._id} className="select-item p-regular-14">
              {category.name}
            </SelectItem>
          ))}
  
          <AlertDialog>
            <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-100 hover:bg-primary-50 focus:text-primary-100">Category</AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>New Category</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input type="text" placeholder="Category name" className="input-field mt-3" onChange={(e) => setNewCategory(e.target.value)} />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                    className='bg-primary-100'
                    onClick={() => startTransition(handleAddCategory)}
                >
                    Add
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      </Select>
    )
  }
  
  export default Dropdown