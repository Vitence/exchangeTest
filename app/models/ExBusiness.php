<?php
class  ExBusiness extends ModelBase{
    public function getSource()
    {
        return 'ex_business';
    }
    
    public static function items(){
        $column = 'id,name';
        $where['status'] = 0;
        $items = parent::select($where,$column);
        return $items ? $items->toArray() :[];
    }
    
    public static function itemById($id){
        $column = 'id,name';
        $where['status'] = 0;
        $where['id'] = $id;
        $item = parent::findRow($where,$column);
        return $item ? $item->toArray() : [];
    }
}