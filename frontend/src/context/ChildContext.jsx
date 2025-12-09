import { createContext, useContext, useState, useEffect } from 'react';
import { childAPI } from '../services/api';
import { useAuth } from './AuthContext';

const ChildContext = createContext();

export const useChild = () => {
  const context = useContext(ChildContext);
  if (!context) {
    throw new Error('useChild must be used within a ChildProvider');
  }
  return context;
};

export const ChildProvider = ({ children }) => {
  const { preloadedData, isAuthenticated } = useAuth();
  const [selectedChild, setSelectedChild] = useState(null);
  const [childrenList, setChildrenList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Use preloaded data from AuthContext if available
  useEffect(() => {
    if (isAuthenticated && preloadedData?.children && !isInitialized) {
      loadChildren(preloadedData.children);
    } else if (isAuthenticated && !isInitialized && !preloadedData) {
      loadChildren();
    } else if (!isAuthenticated) {
      // Reset state when user logs out
      setChildrenList([]);
      setSelectedChild(null);
      setIsInitialized(false);
      setLoading(false);
    }
  }, [isAuthenticated, preloadedData, isInitialized]);

  // Load selected child from localStorage
  useEffect(() => {
    const savedChildId = localStorage.getItem('selectedChildId');
    if (savedChildId && childrenList.length > 0) {
      const child = childrenList.find(c => c.id === savedChildId);
      if (child) {
        setSelectedChild(child);
      }
    }
  }, [childrenList]);

  const loadChildren = async (preloadedData = null) => {
    try {
      setLoading(true);
      setError(null);
      
      // Use preloaded data if available, otherwise fetch
      if (preloadedData) {
        setChildrenList(preloadedData || []);
        setIsInitialized(true);
      } else {
        const response = await childAPI.getChildren();
        setChildrenList(response.data || []);
        setIsInitialized(true);
      }
    } catch (err) {
      console.error('Error loading children:', err);
      setError(err.message || 'Failed to load children');
      setChildrenList([]);
    } finally {
      setLoading(false);
    }
  };

  const selectChild = (child) => {
    setSelectedChild(child);
    if (child) {
      localStorage.setItem('selectedChildId', child.id);
    } else {
      localStorage.removeItem('selectedChildId');
    }
  };

  const addChild = async (childData) => {
    try {
      const response = await childAPI.addChild(childData);
      await loadChildren(); // Reload the list
      return response.data;
    } catch (err) {
      console.error('Error adding child:', err);
      throw err;
    }
  };

  const updateChild = async (childId, childData) => {
    try {
      const response = await childAPI.updateChild(childId, childData);
      await loadChildren(); // Reload the list
      
      // Update selected child if it was the one updated
      if (selectedChild && selectedChild.id === childId) {
        setSelectedChild(response.data);
      }
      
      return response.data;
    } catch (err) {
      console.error('Error updating child:', err);
      throw err;
    }
  };

  const deleteChild = async (childId) => {
    try {
      await childAPI.deleteChild(childId);
      
      // Clear selected child if it was the one deleted
      if (selectedChild && selectedChild.id === childId) {
        setSelectedChild(null);
        localStorage.removeItem('selectedChildId');
      }
      
      await loadChildren(); // Reload the list
    } catch (err) {
      console.error('Error deleting child:', err);
      throw err;
    }
  };

  const recordActivity = async (activityData) => {
    if (!selectedChild) {
      throw new Error('No child selected');
    }

    try {
      const response = await childAPI.recordActivity(selectedChild.id, activityData);
      return response.data;
    } catch (err) {
      console.error('Error recording activity:', err);
      throw err;
    }
  };

  const value = {
    selectedChild,
    childrenList,
    loading,
    error,
    selectChild,
    addChild,
    updateChild,
    deleteChild,
    recordActivity,
    refreshChildren: loadChildren,
    preloadChildren: loadChildren,
    isInitialized
  };

  return <ChildContext.Provider value={value}>{children}</ChildContext.Provider>;
};

export default ChildContext;
